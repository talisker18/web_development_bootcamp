this is an app where you can subscribe with fname,lname and email
your subscription will be saved on mailchimp server

the app also runs not on localhost but in the web on a webserver of Heroku (free webserver!)
	https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

	how to setup heroku:
		read https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up
		install heroku CLI
		create a file named 'Procfile' in root dir of your project and fill it, like 'web: node app.js'
		then create git repo and push the project to git
		go to the root of your project (if not done yet)
		in CLI: 'heroku create'
			heroku will automatically create a server container for you. in the CLI you will see the server address
			'git push heroku master': will push our local code to our heroku webserver
			wait about 10min, the our app should be deployed to heroku
