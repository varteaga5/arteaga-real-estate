class HouseSerializer < ActiveModel::Serializer
  attributes :id, :address, :description

  # adding this association allows us to setup the relationship: house belongs to user
  belongs_to :user

end
