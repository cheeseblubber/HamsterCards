class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :body
      t.integer :card_id
      t.integer :user_id
      t.timestamps
    end

    add_index :comments, :card_id
    add_index :comments, :user_id
  end
end
