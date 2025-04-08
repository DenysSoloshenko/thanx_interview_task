## Rewards Redemption App

### Setup

**Rewards Redemption App**

A simple web application for managing a reward system. Users can earn and redeem points for various rewards. This project is built using React for the frontend and Ruby on Rails for the backend API.

### Features

- **View Current Points**: Users can see their current points balance.
- **View Available Rewards**: Displays a list of rewards available for redemption, with their corresponding point cost.
- **Redeem Rewards**: Users can redeem rewards if they have enough points.
- **Redemption History**: Users can view their past reward redemptions, including the reward and the date of redemption.

### Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Ruby on Rails (API only)
- **Database**: PostgreSQL
- **Authentication**: Cookie-based session handling
- **APIs**: Custom APIs for fetching user points, rewards, and redemption history.

### Installation

#### Backend (Ruby on Rails API)

1. Clone the repository:

   git clone https://github.com/yourusername/rewards-app.git
   cd rewards-app
 
2. Install dependencies:

  bundle install
   
3. Set up the database:   

  rails db:create
  rails db:migrate
  
4. Seed the database with some sample data:

  rails db:seed
  
5. Start the Rails server:

  rails server
  
   
