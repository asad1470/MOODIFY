// const Credit = () => {
//   return (
//     <div className="fixed bottom-5 right-6 z-20 select-none">
//       <p className="font-display text-xs tracking-widest text-white/50">
//         WHERE MOODS BECOME MUSIC  POWERED BY  - {" "}
//         <a
//           href="https://asadportfoliox.netlify.app/"
//           target="_blank"
//           rel="noopener noreferrer"
//           className=" text-white/80 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
//         >
//       ASAD
//         </a>
//       </p>
//     </div>
//   )
// }

// export default Credit
const Credit = ({ variant = "desktop" }) => {
  const inMenu = variant === "menu"

  return (
    <div
      className={
        inMenu
          ? "select-none text-center"
          : "fixed bottom-5 right-6 z-20 hidden select-none lg:block"
      }
    >
      <p
        className={`font-display tracking-widest text-white/50 ${
          inMenu ? "text-[10px] leading-relaxed" : "text-xs"
        }`}
      >
        WHERE MOODS BECOME MUSIC POWERED BY -{" "}
        <a
          href="https://asadportfoliox.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/80 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
        >
          ASAD
        </a>
      </p>
    </div>
  )
}

export default Credit