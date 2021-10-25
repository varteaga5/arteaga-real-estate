class House < ApplicationRecord
  belongs_to :user

  validates :address, presence: true
  validates :description, presence: true
  validates :description, length: { minimum: 10}
end
