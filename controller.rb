require 'sinatra'
require 'json'

get '/' do
	erb :index
end

get '/player/:id' do
	content_type :json
	{:id => '1', :name => 'tim tibow'}.to_json
end

put '/player/:id' do
	puts "A put has been recieved by the server"	
end

post '/player' do
	puts "A post has been recieved by the server"	
end

delete '/player/:id' do
	puts "A delete has been recieved by the server"	
end

get '/players' do
	content_type :json
	[{:id => '1', :name => 'tim tibow'},
    {:id => '2', :name => 'tom brady'},
    {:id => '3', :name => 'eli manning'},
    ].to_json
end


