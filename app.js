'use strict';
const mongoose = require('mongoose');
const express = require('express');

const app = express();

app.listen(8080);

app.use('/user', require('./user/router'));