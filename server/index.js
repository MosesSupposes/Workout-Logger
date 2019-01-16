const express = require('express')
const workoutTargets = require('./workoutTargets.json')
const { port=3333, delay=0 } = require('minimist')(process.argv)
const cors = require('cors')

const byName = name => workoutTarget =>
    name.toLowerCase() === workoutTarget.substr(0, name.length).toLowerCase()

const logger = (req, res, next) => {
    console.log(`${req.method} request for ${req.url}`)
    next()
}

const app = express()
    .use(logger)
    .use(cors())
    .use('/', express.static('../dist/assets/img'))
    .get('/workout-targets', (req, res) =>
        res.status(200).json(workoutTargets)
    )
    .get('/workout-targets/:name', (req, res) =>
        setTimeout(() =>
                res.status(200).json(
                    workoutTargets.filter(byName(req.params.name))
                ),
            delay
        )
    )

app.listen(port, () => console.log(`Workout Logger app running on port ${port} with a ${delay/1000} second delay`))