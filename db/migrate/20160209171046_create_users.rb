class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
    # column definitions go here
    # Use the AR migration guide for syntax reference
    t.column :name, :string
    t.column :email, :string 
    t.column :phone, :string
    t.timestamps null: false
    end
  end
end
