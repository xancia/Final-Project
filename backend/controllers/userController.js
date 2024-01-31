const User = require('../models/User')

async function show(req, res) {
    console.log('GET /api/users')
    try {
        const foundUser = await User.findById(req.id)

        res.status(200).json({
            username: foundUser.username,
            email: foundUser.email,
            animeList: foundUser.animeList
        })

    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

async function create(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.id, 
            {
                $push: { animeList: req.body }
            },
            { new: true } 
        );
        
        res.status(200).json(updatedUser);
    } catch(err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
}

async function remove(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.id, {
        
            $pull: {
                animeList: {
                    mal_id: req.body.mal_id
                }
            }
        },
        { new: true } 
        
        );

        res.status(200).json(updatedUser)
    } catch(err) {
        console.log(err.message)
    }
}

async function update(req,res) {
      try {
        const user = await User.findById(req.id)
        const anime = user.animeList.find(anime => anime.mal_id == req.body.mal_id)
        anime.userScore = req.body.userScore
        await user.save()
        res.status(200).json(user);
    } catch(err) {
        console.log(err.message)
    }
}

module.exports = {
    show,
    create,
    remove
}