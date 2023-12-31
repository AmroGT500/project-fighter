from flask import request, jsonify, make_response, session
from flask_restful import Resource
from models import User, Match, Fighter
from config import app, api, db
import random 

@app.route('/')
def home():
    return "Welcome to the Fighter App!"


class AuthLoginResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(), 200)
        else:
            return {'message': 'Invalid username or password'}, 401


class AuthSignupResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')  

        if User.query.filter_by(username=username).first():
            return {'message': 'Username already exists. Please choose a different username'}, 409
        
        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User created successfully'}, 201


class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({'message':'You have been successfully logged out!'}, 204)


class CheckSession(Resource):
    def get(self):
        print('Checking session', session.get('user_id'))
        user = User.query.filter_by(id = session.get('user_id')).first() 
        if user is not None:
            user_data = {
                'id': user.id,
                'username' : user.username
            }
            return {'message': 'Session is active', 'user': user_data}, 200
        else:
            return {'message': 'No active session', 'user_id': None}, 401


class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({'message':'You have been successfully logged out!'}, 204)


class UserResource(Resource):
    def get(self, user_id=None):
        if user_id is None:
            users = User.query.all()
            users_data = [user.to_dict() for user in users]
            return make_response(users_data, 200)
        else:
            user = User.query.get(user_id)
            if user :
                return make_response(user.to_dict(), 200)
            else:
                return make_response({'error' : 'User Not Found'} , 404) 

    def patch(self, user_id):
        user = User.query.get_or_404(user_id)
        data = request.get_json()
        if 'username' in data:
            user.username = data['username']
        if 'password' in data:
            user.password = data['password']
        db.session.commit()
        return {'message': 'User updated successfully'}

    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully'}


class FighterResource(Resource):
    def get(self, fighter_id=None):
        print('Getting Fighter')
        if fighter_id is None:
            fighters = Fighter.query.all()
            fighters_data = [
                {
                    'id': fighter.id,
                    'name': fighter.name,
                    'image': fighter.image,
                    'image_strip': fighter.image_strip,
                    'sprite_pose': fighter.sprite_pose,
                    'hp': fighter.hp,
                    'ap': fighter.ap
                }
                for fighter in fighters
            ]
            return jsonify(fighters_data)   
        else:
            fighter = Fighter.query.get_or_404(fighter_id)
            fighter_data = {
                'id': fighter.id,
                'name': fighter.name,
                'image': fighter.image,
                'image_strip': fighter.image_strip,
                'sprite_pose': fighter.sprite_pose,
                'hp': fighter.hp,
                'ap': fighter.ap
            }
            return jsonify(fighter_data)


class MatchResource(Resource):
    def get(self, user_id=None):
        if user_id is None:
            matches = Match.query.all()
        else:
            matches = Match.query.filter_by(user_id=user_id).all() 
        matches_data = [match.to_dict(only=('id', 'win_loss', 'fighter1_id', 'fighter2_id')) for match in matches]
        return jsonify(matches_data)
    
    def post(self):
        data = request.get_json()
        user_id = data.get('user_id')
        fighter1_id = data.get('fighter1_id')
        fighter2_id = data.get('fighter2_id')
        win_loss = data.get('win_loss')  

        new_match = Match(user_id=user_id, fighter1_id=fighter1_id, fighter2_id=fighter2_id, win_loss=win_loss)
        db.session.add(new_match)
        db.session.commit()
        return {'message': 'Match created successfully'}, 201


api.add_resource(AuthLoginResource, '/auth/login')
api.add_resource(AuthSignupResource, '/auth/signup')
api.add_resource(CheckSession, '/check-session')

api.add_resource(UserResource, '/users', '/users/<int:user_id>')
api.add_resource(FighterResource, '/fighters', '/fighters/<int:fighter_id>')
api.add_resource(MatchResource, '/matches', '/matches/<int:user_id>')

api.add_resource(Logout, '/logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
