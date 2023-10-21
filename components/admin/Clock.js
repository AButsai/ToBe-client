import { useRef, useEffect } from "react";

import s from "./styles/Clock.module.scss";

const Clock = () => {
  const ssRef = useRef(null);
  const mmRef = useRef(null);
  const hhRef = useRef(null);
  const dotsSecRef = useRef(null);
  const dotsMinRef = useRef(null);
  const dotsHourRef = useRef(null);
  const hoursRef = useRef(null);
  const minuteRef = useRef(null);
  const secondsRef = useRef(null);

  useEffect(() => {
    const timeId = setInterval(() => {
      let h = new Date().getHours();
      let min = new Date().getMinutes();
      let sec = new Date().getSeconds();
      h = h < 10 ? "0" + h : h;
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;

      hoursRef.current.innerHTML = h;
      minuteRef.current.innerHTML = min;
      secondsRef.current.innerHTML = sec;

      if (h > 12) {
        h = h - 12;
      }
      ssRef.current.style.strokeDashoffset = 760 - (760 * sec) / 60;
      mmRef.current.style.strokeDashoffset = 630 - (630 * min) / 60;
      hhRef.current.style.strokeDashoffset = 510 - (510 * h) / 12;

      dotsSecRef.current.style.transform = `rotateZ(${sec * 6}deg)`;
      dotsMinRef.current.style.transform = `rotateZ(${min * 6}deg)`;
      dotsHourRef.current.style.transform = `rotateZ(${h * 30}deg)`;
    }, 1000);

    return () => clearInterval(timeId);
  }, []);

  return (
    <div className={s.time}>
      <div className={s.circle} style={{ "--clr": "#aaaaaa" }}>
        <div className={s.dots} ref={dotsSecRef}></div>
        <svg className={s.svg}>
          <circle
            className={s.circleSvg}
            cx="120"
            cy="120"
            r="120"
            ref={ssRef}
          ></circle>
        </svg>
      </div>
      <div className={s.circle} style={{ "--clr": "#aaaaaa" }}>
        <div className={s.dots} ref={dotsMinRef}></div>
        <svg className={s.svg}>
          <circle
            className={s.circleSvg}
            cx="100"
            cy="100"
            r="100"
            ref={mmRef}
          ></circle>
        </svg>
      </div>
      <div className={s.circle} style={{ "--clr": "#aaaaaa" }}>
        <div className={s.dots} ref={dotsHourRef}></div>
        <svg className={s.svg}>
          <circle
            className={s.circleSvg}
            cx="80"
            cy="80"
            r="80"
            ref={hhRef}
          ></circle>
        </svg>
      </div>
      <div className={s.timeBox}>
        <div
          className={s.hours}
          ref={hoursRef}
          style={{ "--c": "#aaaaaa" }}
        ></div>
        <div
          className={s.minutes}
          ref={minuteRef}
          style={{ "--c": "#aaaaaa" }}
        ></div>
        <div ref={secondsRef} style={{ "--c": "#aaaaaa" }}></div>
      </div>
    </div>
  );
};

export default Clock;
