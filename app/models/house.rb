class House < ApplicationRecord
  belongs_to :user

  validates :address, presence: true
  validates :description, presence: true
  validates :description, length: { minimum: 10}

  # custom method
  # query the database, need to access the params 
  
  # search = @current_user.houses.where("description LIKE (?)", "%#{params[:query]}%")

  def self.query(rcvdQuery)
    # can call without House in front of where because of self.
    # uses wildcard symbol %
    where("description LIKE (?)", "%#{rcvdQuery}%")
  end
  # instance versus class 
  # see how they are called and track back
  # scope methods, 
end

