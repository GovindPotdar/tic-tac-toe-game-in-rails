require 'securerandom'

class GamesController < ApplicationController

    def new
        redirect_to game_path(SecureRandom.uuid,user:1  )
    end
    
    def show
    end

    def join
        redirect_to game_path(params["id"],user:2  )
    end

end
