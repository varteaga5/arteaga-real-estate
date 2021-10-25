class CreateHouses < ActiveRecord::Migration[6.1]
  def change
    create_table :houses do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :address
      t.text :description

      t.timestamps
    end
  end
end
