import React, { useState, useEffect } from "react"

// Get the CSRF token from the meta tag
const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

const userId = 1

export default function RewardsApp() {
  const [points, setPoints] = useState(0)
  const [rewards, setRewards] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    fetch(`/api/users/${userId}/show_points_balance`)
      .then(res => res.json())
      .then(data => {
        if (data && data.points) {
          setPoints(data.points); // Only update if 'points' exists in the response
        } else {
          console.error("Points data is missing or invalid");
        }
      })
      .catch(error => {
        console.error("Error fetching points:", error);
      });

    fetch(`/api/rewards`)
      .then(res => res.json())
      .then(setRewards)
      .catch(error => console.error("Error fetching rewards:", error));

    // Initial fetch of redemption history
    fetch(`/api/users/${userId}/redemptions`)
      .then(res => res.json())
      .then(setHistory)
      .catch(error => console.error("Error fetching redemption history:", error));
  }, []);

  const redeem = (rewardId, rewardPoints) => {
    // Check if the user has enough points
    if (points < rewardPoints) {
      setError("You do not have enough points to redeem this reward.");
      return;
    }

    // Make the redemption request
    fetch(`/api/redemptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken },
      body: JSON.stringify({ user_id: userId, reward_id: rewardId })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to redeem reward");
        }
        return res.json();
      })
      .then(() => {
        // After successful redemption, fetch the updated points
        fetch(`/api/users/${userId}/show_points_balance`)
          .then(res => res.json())
          .then(data => {
            if (data && data.points !== undefined) {
              setPoints(data.points); // Update the points in the state
            } else {
              console.error("Invalid points data");
            }
          })
          .catch(error => console.error("Error fetching updated points:", error));

        // Fetch updated redemption history
        fetch(`/api/users/${userId}/redemptions`)
          .then(res => res.json())
          .then(updatedHistory => setHistory(updatedHistory))
          .catch(error => console.error("Error fetching redemption history:", error));

        setError(null); // Clear any previous error
      })
      .catch(error => {
        console.error("Error during redemption:", error);
        setError("Something went wrong. Please try again.");
      });
  };

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
        {history.map((r, idx) => {
          const redeemedAt = new Date(r.redeemed_at);
          const formattedDate = isNaN(redeemedAt) ? "Invalid Date" : redeemedAt.toLocaleString();

          return (
            <li key={idx}>
              {r.reward} at {formattedDate}
            </li>
          );
        })}
      </ul>
    </div>
  )
}