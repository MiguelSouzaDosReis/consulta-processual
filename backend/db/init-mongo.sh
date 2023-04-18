#!/bin/bash

mongoimport --db lawsuits_db --collection lawsuits_collection --file ./lawsuits.json
