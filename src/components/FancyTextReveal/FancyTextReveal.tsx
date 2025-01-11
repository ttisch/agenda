import VerticalCutReveal from './../fancy/vertical-cut-reveal';

export default function Preview() {
  return (
    <div className="w-full h-full xs:text-2xl text-2xl sm:text-4xl md:text-7xl lg:text-7xl xl:text-7xl flex flex-col items-start justify-center font-overusedGrotesk bg-background p-10 md:p-16 lg:p-24 text-[#555] tracking-wide uppercase">
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
        ... INTO YOUR HEADLINES 📰
      </VerticalCutReveal>
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.025}
        staggerFrom="center"
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 21,
          delay: 1.1,
        }}
      >
        {`LET'S GO 😊`}
      </VerticalCutReveal>
    </div>
  );
}
