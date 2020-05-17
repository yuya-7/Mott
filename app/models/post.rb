class Post < ApplicationRecord
  belongs_to :user
  has_many :images, dependent: :destroy

  validates :name, presence: true, length: {maximum: 30}
  validates :introduction, presence: true, length: {maximum: 200}
  validates :images, presence: true
  validates_associated :images
end
