class HouseSerializer < ActiveModel::Serializer
  attributes :id, :address, :description

  # adding this association allows us to setup the relationship: house has one user
  has_one :user
end
