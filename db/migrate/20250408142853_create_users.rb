class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :name
      t.integer :points_balance, default: 0

      t.timestamps
    end
  end
end
