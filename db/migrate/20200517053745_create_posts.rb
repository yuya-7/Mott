class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.references :user,         null: false, foreign_key: true
      t.string     :name,         null: false
      t.text       :introduction, null: false

      t.timestamps
    end
  end
end
