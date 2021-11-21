class HouseSerializer < ActiveModel::Serializer
  attributes :id, :address, :description

  belongs_to :user

end
