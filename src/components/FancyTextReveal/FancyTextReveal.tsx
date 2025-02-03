import VerticalCutReveal from './../fancy/vertical-cut-reveal';

export default function Preview() {
  return (
    <div className="w-full xs:text-2xl text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl flex flex-col items-start justify-center font-overusedGrotesk text-[#555] tracking-wide uppercase">
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.025}
        staggerFrom="first"
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 21,
        }}
      >
        TURN YOUR DEADLINES ⏰ ...
      </VerticalCutReveal>
      <br />
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.025}
        staggerFrom="last"
        reverse
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 21,
          delay: 0.5,
        }}
      >
        ... INTO HEADLINES 📰
      </VerticalCutReveal>
      {/* <br />
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.025}
        staggerFrom="center"
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 21,
          delay: 1.5,
        }}
      >
        {`LET'S GO 😊`}
      </VerticalCutReveal> */}
    </div>
  );
}
