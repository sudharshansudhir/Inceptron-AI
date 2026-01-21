export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-emerald-700 text-white text-center py-4 text-sm shadow-inner">
      <p className="tracking-wide">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-yellow-300">
          AI Classroom
        </span>
        . All rights reserved.
      </p>
    </footer>
  );
}
