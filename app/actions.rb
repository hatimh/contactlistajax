# Homepage (Root path)
get '/' do
  erb :index
end

get '/users' do
  User.all.to_json
end

get '/:id' do
  User.find(params[:id]).to_json    
end

get '/search/:query' do
  User.where("name LIKE ? OR email LIKE ?","%#{params[:query]}%","%#{params[:query]}%").to_json    
end

post '/users' do
  name = params[:name]
  email = params[:email]
  phone = params[:phone]
  results = {result: false}

  user = User.new(name: name, email: email, phone: phone)
  if user.save
    results[:result] = true
    results[:id] = user.id
  end
  results.to_json
end

post '/update' do
  id = params[:id].to_i
  name = params[:name]
  email = params[:email]
  phone = params[:phone]    
  @user = User.find(id)
  if @user
    @user.update(name: name, email: email, phone: phone)      
  end 
end

post '/delete' do
  id = params[:id].to_i     
  @user = User.find(id)
  if @user
    @user.destroy      
  end 
end