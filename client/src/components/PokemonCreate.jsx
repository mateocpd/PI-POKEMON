import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { postPoke, getTypes } from '../actions'
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';


