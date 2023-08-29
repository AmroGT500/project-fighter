from config import app, db
from models import User, Fighter, Match


def create_mock_data():
    with app.app_context():

        User.query.delete()
        Fighter.query.delete()
        Match.query.delete()

        # Create mock users
        user1 = User(username='user1', password='12345')
        user2 = User(username='user2', password='hashed_password2')
        db.session.add_all([user1, user2])
        db.session.commit()


        fighter1 = Fighter(name='Cell', image='https://i.imgur.com/EajHyQY.png', hp=200, ap=18, sprite_pose='https://i.imgur.com/96Xfrds.png', image_strip= 'https://i.imgur.com/NDqaRAt.png')
        fighter2 = Fighter(name='Frieza', image='https://i.imgur.com/ijy3OdR.png', hp=180, ap=20, sprite_pose='https://i.imgur.com/gA6MhHA.png', image_strip= 'https://i.imgur.com/wv7ChTp.png')
        fighter3 = Fighter(name='Goku', image='https://i.imgur.com/bX7SWvp.png', hp=200, ap=25, sprite_pose='https://i.imgur.com/17NALy9.png', image_strip= 'https://i.imgur.com/WzfAJHY.png')
        fighter4 = Fighter(name='Kid Buu', image='https://i.imgur.com/eNO6RfM.png', hp=170, ap=30, sprite_pose='https://i.imgur.com/G5EAsdB.png', image_strip= 'https://i.imgur.com/zpjiOCb.png')
        fighter5 = Fighter(name='Piccolo', image='https://i.imgur.com/qPtuqPy.png', hp=175, ap=22, sprite_pose='https://i.imgur.com/vF0UPVQ.png', image_strip= 'https://i.imgur.com/dbjZqRi.png')
        fighter6 = Fighter(name='Vegeta', image='https://i.imgur.com/apPD4jT.png', hp=195, ap=26, sprite_pose='https://i.imgur.com/ROhXGMX.png', image_strip= 'https://i.imgur.com/JAfEiav.png')

        
        db.session.add_all([
            fighter1, fighter2, fighter3, fighter4,
            fighter5, fighter6
        ])
        db.session.commit()

        # Create mock matches
        match1 = Match(win_loss=True, user=user1, fighter1_id=fighter1.id, fighter2_id=fighter2.id)
        match2 = Match(win_loss=True, user=user2, fighter1_id=fighter2.id, fighter2_id=fighter1.id)
        match3 = Match(win_loss=True, user=user2, fighter1_id=fighter3.id, fighter2_id=fighter4.id)
        match4 = Match(win_loss=False, user=user2, fighter1_id=fighter4.id, fighter2_id=fighter3.id)
        match5 = Match(win_loss=False, user=user1, fighter1_id=fighter5.id, fighter2_id=fighter6.id)
        match6 = Match(win_loss=True, user=user2, fighter1_id=fighter6.id, fighter2_id=fighter5.id)
        match7 = Match(win_loss=False, user=user1, fighter1_id=fighter4.id, fighter2_id=fighter3.id)
        match8 = Match(win_loss=False, user=user1, fighter1_id=fighter5.id, fighter2_id=fighter6.id)
        match9 = Match(win_loss=True, user=user2, fighter1_id=fighter6.id, fighter2_id=fighter5.id)
        match10 = Match(win_loss=False, user=user2, fighter1_id=fighter4.id, fighter2_id=fighter3.id)
        match11 = Match(win_loss=False, user=user1, fighter1_id=fighter5.id, fighter2_id=fighter6.id)
        match12 = Match(win_loss=True, user=user1, fighter1_id=fighter4.id, fighter2_id=fighter5.id)
        match13 = Match(win_loss=True, user=user2, fighter1_id=fighter3.id, fighter2_id=fighter1.id)
        match14 = Match(win_loss=True, user=user1, fighter1_id=fighter4.id, fighter2_id=fighter3.id)
        match15 = Match(win_loss=False, user=user1, fighter1_id=fighter3.id, fighter2_id=fighter6.id)
        match16 = Match(win_loss=True, user=user2, fighter1_id=fighter3.id, fighter2_id=fighter5.id)
        match17 = Match(win_loss=False, user=user2, fighter1_id=fighter4.id, fighter2_id=fighter3.id)

        
        db.session.add_all([
            match1, match2, match3, match4,
            match5, match6, match7, match8, 
            match9, match10,
            match11, match12,
            match13, match14,
            match15, match16,
            match17
        ])
        db.session.commit()


if __name__ == '__main__':
    create_mock_data()
    print('Test data seeded successfully.')