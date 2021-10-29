class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :wants
  has_many :houses

end
