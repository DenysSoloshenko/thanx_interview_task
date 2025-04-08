import React, { useState, useEffect } from "react"

const userId = 1

export default function RewardsApp() {
  const [points, setPoints] = useState(0)
  const [rewards, setRewards] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    fetch(`/api/users/${userId}/points`)
      .then(res => res.json()).then(data => setPoints(data.points))

    fetch(`/api/rewards`).then(res => res.json()).then(setRewards)

    fetch(`/api/users/${userId}/redemptions`)
      .then(res => res.json()).then(setHistory)
  }, [])

  const redeem = (rewardId) => {
    fetch(`/api/redemptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, reward_id: rewardId })
    }).then(() => window.location.reload())
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Your Points: {points}</h1>
      <h2 className="text-lg">Available Rewards:</h2>
      <ul className="space-y-2">
        {rewards.map(reward => (
          <li key={reward.id} className="flex justify-between border p-2">
            {reward.title} - {reward.cost} points
            <button onClick={() => redeem(reward.id)} className="bg-blue-500 text-white px-2">Redeem</button>
          </li>
        ))}
      </ul>
      <h2 className="text-lg">Redemption History:</h2>
      <ul>
        {history.map((r, idx) => (
          <li key={idx}>{r.reward} at {new Date(r.redeemed_at).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  )
}