from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)

    # RELATIONSHIPS
    matches = db.relationship('Match', back_populates='user', cascade = "all, delete-orphan")

    # ASSOCIATION PROXY
    # fighters = association_proxy('matches' , 'fighter') 

    # SERIALIZATION 
    serialize_rules = ('-matches.user', '-_password_hash')

    @property
    def password(self):
        return self._password_hash

    @password.setter
    def password(self, new_password_string):
        plain_byte_obj = new_password_string.encode('utf-8')
        encrypted_hash_object = bcrypt.generate_password_hash(plain_byte_obj)
        hash_object_as_string = encrypted_hash_object.decode('utf-8')
        self._password_hash = hash_object_as_string

    def authenticate(self, password_string):
        return bcrypt.check_password_hash(self.password, password_string.encode('utf-8'))


class Match(db.Model, SerializerMixin):    
    __tablename__ = 'matches'

    id = db.Column(db.Integer, primary_key=True)
    win_loss = db.Column(db.Boolean, nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    fighter1_id = db.Column(db.Integer, db.ForeignKey('fighters.id'), nullable=False)
    fighter2_id = db.Column(db.Integer, db.ForeignKey('fighters.id'), nullable=False)

    # RELATIONSHIPS
    user = db.relationship('User', back_populates='matches')
    fighter1 = db.relationship('Fighter', foreign_keys=[fighter1_id], back_populates='matches_fighter1')
    fighter2 = db.relationship('Fighter', foreign_keys=[fighter2_id], back_populates='matches_fighter2')

    # SERIALIZATION 
    serialize_rules = ('-user.matches', '-fighter1.matches_fighter1', '-fighter2.matches_fighter2', 
                    '-fighter1.matches_fighter2', '-fighter2.matches_fighter1',)


class Fighter(db.Model, SerializerMixin):
    __tablename__ = 'fighters'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    hp = db.Column(db.Integer)
    ap = db.Column(db.Integer)
    image = db.Column(db.String)
    image_strip = db.Column(db.String)
    sprite_pose = db.Column(db.String)
    
    # RELATIONSHIPS
    matches_fighter1 = db.relationship('Match', foreign_keys= 'Match.fighter1_id', back_populates='fighter1')
    matches_fighter2 = db.relationship('Match', foreign_keys= 'Match.fighter2_id', back_populates='fighter2')

    # ASSOCIATION PROXY
    # users = association_proxy('matches' , 'user')

    # SERIALIZATION 
    serialize_rules = ('-matches_fighter1.fighter1', '-matches_fighter2.fighter2', '-users.fighters',)
