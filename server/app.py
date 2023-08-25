from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
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
        if user and check_password_hash(user.password_hash, password):
            return {'user_id': user.id}, 200
        else:
            return {'message': 'Invalid username or password'}, 401

class AuthSignupResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password_hash')  # Use the provided password_hash

        if User.query.filter_by(username=username).first():
            return {'message': 'Username already exists. Please choose a different username'}, 409
        
        new_user = User(username=username, password_hash=generate_password_hash(password))
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User created successfully'}, 201

class UserResource(Resource):
    def get(self, user_id=None):
        if user_id is None:
            users = User.query.all()
            users_data = [{'id': user.id, 'username': user.username} for user in users]
            return jsonify(users_data)
        else:
            user = User.query.get_or_404(user_id)
            user_data = {'id': user.id, 'username': user.username}
            return jsonify(user_data)

    def patch(self, user_id):
        user = User.query.get_or_404(user_id)
        data = request.get_json()
        if 'username' in data:
            user.username = data['username']
        if 'password_hash' in data:
            user.password_hash = data['password_hash']
        db.session.commit()
        return {'message': 'User updated successfully'}

    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully'}


class FighterResource(Resource):
    def get(self, fighter_id=None):
        if fighter_id is None:
            fighters = Fighter.query.all()
            fighters_data = [{'id': fighter.id, 'name': fighter.name} for fighter in fighters]
            return jsonify(fighters_data)
        else:
            fighter = Fighter.query.get_or_404(fighter_id)
            fighter_data = {'id': fighter.id, 'name': fighter.name}
            return jsonify(fighter_data)

class MatchResource(Resource):
    def get(self, match_id=None):
        if match_id is None:
            matches = Match.query.all()
            matches_data = [match.to_dict(only=('id', 'win_loss', 'fighter1_id', 'fighter2_id')) for match in matches]
            return jsonify(matches_data)
        else:
            match = Match.query.get_or_404(match_id, description = "match not found, sorry eh, im Canadian")
            match_data = match.to_dict(only=('id', 'win_loss', 'fighter1_id', 'fighter2_id'))
            return jsonify(match_data)

api.add_resource(AuthLoginResource, '/auth/login')
api.add_resource(AuthSignupResource, '/auth/signup')
api.add_resource(UserResource, '/users', '/users/<int:user_id>')
api.add_resource(FighterResource, '/fighters', '/fighters/<int:fighter_id>')
api.add_resource(MatchResource, '/matches', '/matches/<int:match_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
