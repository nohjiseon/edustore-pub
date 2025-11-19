'use client'

import Matter, { Bodies, Composite, Mouse, MouseConstraint } from 'matter-js'
import { ReactNode, useEffect, useRef, useState } from 'react'

import styles from './GravityBox.module.scss'

export interface GravityBoxProps {
  items?: ReactNode[]
  className?: string
}

const GravityBox = ({ items = [], className }: GravityBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const renderRef = useRef<Matter.Render | null>(null)
  const itemRefsRef = useRef<(HTMLDivElement | null)[]>([])
  const bodiesRef = useRef<Matter.Body[]>([])
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  // 컨테이너 크기 측정
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()

    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  // 물리 엔진 초기화 및 아이템 동기화
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0)
      return

    // eslint-disable-next-line import/no-named-as-default-member
    const { Engine, Render, Runner, Events } = Matter
    const { width, height } = dimensions

    // 엔진 생성
    const engine = Engine.create()
    engine.gravity.y = 2
    engineRef.current = engine

    // 렌더러 생성
    const render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent'
      }
    })
    renderRef.current = render

    // 바닥과 벽 생성 (고정된 경계)
    const ground = Bodies.rectangle(width / 2, height - 10, width, 20, {
      isStatic: true,
      restitution: 0.9,
      render: { fillStyle: 'transparent' }
    })
    const leftWall = Bodies.rectangle(10, height / 2, 20, height, {
      isStatic: true,
      restitution: 0.9,
      render: { fillStyle: 'transparent' }
    })
    const rightWall = Bodies.rectangle(width - 10, height / 2, 20, height, {
      isStatic: true,
      restitution: 0.9,
      render: { fillStyle: 'transparent' }
    })
    const ceiling = Bodies.rectangle(width / 2, 10, width, 20, {
      isStatic: true,
      restitution: 0.9,
      render: { fillStyle: 'transparent' }
    })

    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling])

    // 아이템들을 물리 객체로 변환
    const bodies: Matter.Body[] = []
    itemRefsRef.current.forEach((itemRef, index) => {
      if (itemRef) {
        const rect = itemRef.getBoundingClientRect()
        const x =
          Math.random() * (width - rect.width - 100) + 50 + rect.width / 2
        const y = Math.random() * 100 + 50 + rect.height / 2

        const body = Bodies.rectangle(x, y, rect.width, rect.height, {
          restitution: 0.9,
          friction: 0.2,
          render: { fillStyle: 'transparent' }
        })

        bodies.push(body)
        Composite.add(engine.world, body)
      }
    })
    bodiesRef.current = bodies

    // 마우스 컨트롤 추가
    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    })

    Composite.add(engine.world, mouseConstraint)

    // 물리 엔진 업데이트마다 DOM 요소 위치 동기화
    Events.on(engine, 'afterUpdate', () => {
      bodies.forEach((body, index) => {
        const itemRef = itemRefsRef.current[index]
        if (itemRef) {
          itemRef.style.transform = `translate(${
            body.position.x - itemRef.offsetWidth / 2
          }px, ${body.position.y - itemRef.offsetHeight / 2}px) rotate(${
            body.angle
          }rad)`
        }
      })
    })

    // 렌더링 시작
    Render.run(render)
    const runner = Runner.create()
    Runner.run(runner, engine)

    // 정리 함수
    return () => {
      Render.stop(render)
      Runner.stop(runner)
      Engine.clear(engine)
      render.canvas.remove()
      render.textures = {}
    }
  }, [dimensions, items.length])

  return (
    <div
      ref={containerRef}
      className={`${styles.gravity_box} ${className || ''}`}
    >
      <canvas ref={canvasRef} className={styles.canvas} />
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            itemRefsRef.current[index] = el
          }}
          className={styles.gravity_item}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

export default GravityBox
