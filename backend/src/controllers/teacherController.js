import Class from "../models/Class.js";
import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Create new class
 */
export const createClass = async (req, res) => {
  try {
    const { className } = req.body;

    if (!className) {
      return res.status(400).json({ message: "Class name required" });
    }

    const newClass = await Class.create({
      className,
      teacherId: req.user._id,
      students: [],
      subjects: []
    });

    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Add student to class
 */
export const addStudentToClass = async (req, res) => {
  try {
    const { email } = req.body;
    const { id } = req.params;

    const student = await User.findOne({ email, role: "student" });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const classGroup = await Class.findOne({
      _id: id,
      teacherId: req.user._id
    });

    if (!classGroup) {
      return res.status(404).json({ message: "Class not found" });
    }

    if (classGroup.students.includes(student._id)) {
      return res.status(400).json({ message: "Student already added" });
    }

    classGroup.students.push(student._id);
    student.classIds.push(classGroup._id);

    await classGroup.save();
    await student.save();

    res.json({ message: "Student added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Remove student from class
 */
export const removeStudentFromClass = async (req, res) => {
  try {
    const { id, sid } = req.params;

    const classGroup = await Class.findOne({
      _id: id,
      teacherId: req.user._id
    });

    if (!classGroup) {
      return res.status(404).json({ message: "Class not found" });
    }

    classGroup.students = classGroup.students.filter(
      s => s.toString() !== sid
    );

    await User.updateOne(
      { _id: sid },
      { $pull: { classIds: id } }
    );

    await classGroup.save();
    res.json({ message: "Student removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Add subject to class
 */
export const addSubjectToClass = async (req, res) => {
  try {
    let { subjectName } = req.body;
subjectName = subjectName.trim().toLowerCase();

    const { id } = req.params;

    if (!subjectName) {
      return res.status(400).json({ message: "Subject name required" });
    }

    const classGroup = await Class.findOne({
      _id: id,
      teacherId: req.user._id
    });

    if (!classGroup) {
      return res.status(404).json({ message: "Class not found" });
    }

    const namespace = `${req.user._id}_${id}_${uuidv4()}`;

    classGroup.subjects.push({
      subjectName,
      vectorNamespace: namespace
    });

    await classGroup.save();

    res.status(201).json({ message: "Subject added" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get teacher's classes
 */
export const getMyClasses = async (req, res) => {
  try {
    const classes = await Class.find({ teacherId: req.user._id })
      .populate("students", "name email");

    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
