#!/usr/bin/env node

// Importing required modules
import { config } from 'dotenv';
// Modules
import io from './io.js';
import callsign from './callsign.js';

// Load environment variables from .env file
config();

// Display Callsign
callsign();

// Start handling user input
io();
