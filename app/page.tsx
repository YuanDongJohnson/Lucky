"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"

const fortunes = ["大吉", "吉", "小吉", "平", "小凶", "凶", "大凶"]
const words = [
  "万事如意,心想事成!",
  "诸事顺利,平安喜乐!",
  "小有收获,继续努力!",
  "平稳安康,宜静不宜动。",
  "小心谨慎,逢凶化吉。",
  "诸事不顺,谨慎行事。",
  "避险趋吉,静待时机。",
]

export default function Home() {
  const [fortune, setFortune] = useState("")
  const [word, setWord] = useState("")
  const [isDrawing, setIsDrawing] = useState(false)
  const [canDraw, setCanDraw] = useState(true)

  useEffect(() => {
    const lastDrawDate = localStorage.getItem("lastDrawDate")
    const today = format(new Date(), "yyyy-MM-dd")
    if (lastDrawDate === today) {
      setCanDraw(false)
      const savedFortune = localStorage.getItem("lastFortune")
      const savedWord = localStorage.getItem("lastWord")
      if (savedFortune && savedWord) {
        setFortune(savedFortune)
        setWord(savedWord)
      }
    }
  }, [])

  const drawFortune = () => {
    if (!canDraw) return

    setIsDrawing(true)
    setTimeout(() => {
      const index = Math.floor(Math.random() * fortunes.length)
      const randomFortune = fortunes[index]
      const randomWord = words[index]
      setFortune(randomFortune)
      setWord(randomWord)
      setIsDrawing(false)
      setCanDraw(false)
      localStorage.setItem("lastDrawDate", format(new Date(), "yyyy-MM-dd"))
      localStorage.setItem("lastFortune", randomFortune)
      localStorage.setItem("lastWord", randomWord)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-red-200 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center gap-8 p-4">
        <div className="relative w-[300px] h-[600px] flex justify-center">
          {/* 竹筒 */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150px] h-[400px] bg-gradient-to-b from-[#D2691E] via-[#8B4513] to-[#D2691E] rounded-lg shadow-lg z-20 flex items-center justify-center overflow-hidden">
            <div className="w-24 h-24 rounded-full bg-[#8B4513] flex items-center justify-center relative">
              <span
                className="text-[#F4A460] text-3xl font-bold absolute"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
              >
                签
              </span>
              <div className="absolute inset-0 bg-black opacity-10 rounded-full"></div>
            </div>
          </div>

          {/* 固定的假签 */}
          <div className="absolute left-1/2 -ml-[40px] bottom-[25px] w-6 h-[450px] bg-gradient-to-b from-[#F4A460] to-[#D2691E] rounded-t-lg shadow-md transform -rotate-3 z-10 overflow-hidden">
            <span
              className="absolute top-2 left-1/2 -translate-x-1/2 text-[#8B4513] text-xs font-bold"
              style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
            >
              签
            </span>
          </div>
          <div className="absolute left-1/2 ml-[20px] bottom-[25px] w-6 h-[450px] bg-gradient-to-b from-[#F4A460] to-[#D2691E] rounded-t-lg shadow-md transform rotate-3 z-10 overflow-hidden">
            <span
              className="absolute top-2 left-1/2 -translate-x-1/2 text-[#8B4513] text-xs font-bold"
              style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
            >
              签
            </span>
          </div>

          {/* 可抽动的签 */}
          {isDrawing ? (
            <motion.div
              className="absolute left-1/2 -ml-3 bottom-[25px] w-6 h-[450px] bg-gradient-to-b from-[#F4A460] to-[#D2691E] rounded-t-lg shadow-md z-30 overflow-hidden"
              initial={{ y: 0 }}
              animate={[
                { x: [-5, 5, -5, 5, 0], rotate: [-2, 2, -2, 2, 0], transition: { duration: 0.5 } },
                { y: [-250, 0], transition: { duration: 1.5, delay: 0.5 } },
              ]}
            >
              <span
                className="absolute top-2 left-1/2 -translate-x-1/2 text-[#8B4513] text-xs font-bold"
                style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
              >
                签
              </span>
            </motion.div>
          ) : (
            <div className="absolute left-1/2 -ml-3 bottom-[25px] w-6 h-[450px] bg-gradient-to-b from-[#F4A460] to-[#D2691E] rounded-t-lg shadow-md z-10 overflow-hidden">
              <span
                className="absolute top-2 left-1/2 -translate-x-1/2 text-[#8B4513] text-xs font-bold"
                style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
              >
                签
              </span>
            </div>
          )}
        </div>

        <button
          onClick={drawFortune}
          disabled={isDrawing || !canDraw}
          className="relative px-10 py-4 text-2xl font-semibold text-white rounded-full 
            bg-gradient-to-b from-[#FFD700] via-[#FFA500] to-[#FF8C00]
            before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-t 
            before:from-white/20 before:to-transparent before:opacity-50
            shadow-[0_5px_15px_rgba(0,0,0,0.3)]
            hover:from-[#FFE55C] hover:via-[#FFB52E] hover:to-[#FFA500]
            active:translate-y-0.5 active:shadow-[0_2px_5px_rgba(0,0,0,0.3)]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-150 overflow-hidden"
        >
          <span className="relative z-10">{isDrawing ? "抽签中..." : canDraw ? "抽签" : "今日已抽过"}</span>
        </button>

        {fortune && (
          <div className="text-center bg-white/90 p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-4xl font-bold mb-4 text-[#8B4513]">{fortune}</h2>
            <p className="text-xl text-gray-700">{word}</p>
          </div>
        )}
      </div>
    </div>
  )
}

