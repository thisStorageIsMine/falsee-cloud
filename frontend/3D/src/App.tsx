import Spline from '@splinetool/react-spline';
import { Application, SPEObject } from '@splinetool/runtime';
import { useRef, useEffect, MutableRefObject } from 'react'

export default function App() {
  const splineRef = useRef<HTMLDivElement>(null);

  let phoneRef = useRef<SPEObject | null>(null),
    wordRef = useRef<SPEObject | null>(null),
    musicRef = useRef<SPEObject | null>(null),
    imageRef = useRef<SPEObject | null>(null);

  // Устанавливаем ревы при загрузке сцены
  function handleLoad(spline: Application) {
    const phone = spline.findObjectByName('phone'),
      wordIcon = spline.findObjectByName('word'),
      musicIcon = spline.findObjectByName('music'),
      imageIcon = spline.findObjectByName('image');

    phoneRef.current = phone!;
    wordRef.current = wordIcon!;
    musicRef.current = musicIcon!;
    imageRef.current = imageIcon!;
  }

  function customOrbit(ref: MutableRefObject<SPEObject | null>,
    offsetXFactor: number, // Максимальное смещение по X и Y
    offsetYFactor: number,
    rotateXFactor: number,
    rotateYFactor: number,
  ) {
    if (!ref.current) return;
    const cur = ref.current;
    // Начальные координаты
    const x0 = cur.position.x,
      y0 = cur.position.y;
    // Начальное вращение
    const rx0 = cur.rotation.x,
      ry0 = cur.rotation.y;


    window.addEventListener('mousemove', (e: MouseEvent) => {
      const dx = Number((e.clientX / window.innerWidth).toFixed(2)),
        dy = Number((e.clientY / window.innerHeight).toFixed(2));

      const nextX = x0 + dx * offsetXFactor,
        nextY = y0 + dy * offsetYFactor;

      const rotationX = dx * rotateXFactor / 100,
        rotationY = dy * rotateYFactor / 100;

      const nextRotationX = rx0 + rotationX,
        nextRotationY = ry0 + rotationY;

      cur.position.x = nextX;
      cur.position.y = nextY;
      cur.rotation.x = nextRotationX;
      cur.rotation.y = nextRotationY;
    })

  }

  return (
    <section className='w-screen h-screen'>
      <Spline scene="https://prod.spline.design/70l3bF-BNp93S1aA/scene.splinecode"
        onLoad={(e: Application) => {
          handleLoad(e)
          customOrbit(phoneRef, 100, 100, 1, 2)
          customOrbit(wordRef, 20, 49, 15, 11)
          customOrbit(musicRef, 5, 11, 20, 31)
          customOrbit(imageRef, 80, 135, 35, 55)
        }}
        ref={splineRef}
      />
      <button
        onClick={() => {
          console.log(wordRef.current)
        }}
      >Rotate</button>
    </section>
  );
}


export { App }