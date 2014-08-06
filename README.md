#Electrocution
Because it uses *sockets*, get it! Electrocution is a server built on node.js. As of now, the only functionality is an online chat but
who knows what's going to come next.
##Setup
1. Download Electrocution: `git clone https://github.com/blockaj/Electrocution.git`
2. `cd` into the directory where you downloaded Electrocution
3. Configure the server in config.json

		{
			"name": "Name that will appear on pages",
			"description": "Description of your site",
			"db": "name of database",
			"port": "port to run server on",
			"adminUsername": "admin username",
			"adminPassword": "admin password",
			"sessionSecret": "session secret for security purposes"
		}

4. Run `make install` to download and install all of the node modules
