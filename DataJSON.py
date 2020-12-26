import json
from time_stamp import getCurrentTimeStamp

class DataJSON:

	def __init__(self, data):
		"""
		Initializes DataJSON File object

		@param data: JSON file location that will be loaded for use
		"""
		assert isinstance(data, str), "Data location must be provided in type 'str'!"
		
		# load the location provided
		data = json.loads(open(data).read())

		# check for correct format
		assert isinstance(data, list), "Data must be of type 'list'!"

		for element in data:
			assert isinstance(element, dict), "Each element of data must be of type 'dict'!"

		self.data = data

	def __repr__(self):
		return str(self.data)

	def __iter__(self):
		for element in self.data:
			yield element

	def update_data(self, new_data = None):
		"""
		Method that updates the data currently in json data file

		@param new_data: updated list of message dictionaries
		@returns: none
		"""
		if new_data == None:
			new_data = self.data

		else:
			assert isinstance(new_data, list), f"{new_data} must be of type list!"

		with open("data.json", "w") as dw:
			json.dump(new_data, dw)

	def encode_data(self, username, message, time_stamp = None):
		"""
		Method that encodes data (intended to be used before adding to data file)
		
		@param time_stamp: current time stamp (will automatically compute if not provided)
		@param username: username of client
		@param message: message being formatted
		@returns: none
		"""
		assert isinstance(username, str), f"{username} must be of type 'str'!"
		assert isinstance(message, str), f"{message} must be of type 'str'!"

		if time_stamp == None:
			time_stamp = getCurrentTimeStamp()

		return {"TIME_STAMP": time_stamp, "NAME": username, "MESSAGE": message}

	def decode_data(self, json_data, seperate_time = False):
		"""
		Method that decodes data (intended to be used when modifying message values)
		
		@param json_data: the dictionary of message values
		@returns: none
		"""
		assert isinstance(json_data, dict)

		username = json_data["NAME"]
		message = json_data["MESSAGE"]
		time_stamp = json_data["TIME_STAMP"]

		if seperate_time:
			raise NotImplementedError

		return [username, message, time_stamp]

	def add_new_message(self, username, new_message):
		"""
		Method that adds a new message value to the data file
		
		@param username: username of client
		@param new_message: new message being added
		@returns: none
		"""
		assert isinstance(username, str), f"{username} must be of type 'str'!"
		assert isinstance(new_message, str), f"{new_message} must be of type 'str'!"

		self.data.append(self.encode_data(username, new_message))
		self.update_data()

	def delete_message(self, username, target_message, time_stamp):
		"""
		Method that adds a new message value to the data file
		
		@param time_stamp: time stamp of target message
		@param username: username of client
		@param target_message: target message being deleted
		@returns: none
		"""
		assert isinstance(username, str), f"{username} must be of type 'str'!"
		assert isinstance(target_message, str), f"{target_message} must be of type 'str'!"
		
		for element in self.data:
			if element == self.encode_data(username, target_message, time_stamp):
				self.data.remove(element)
				self.update_data()
				return

		raise Exception(f"Target with keys {time_stamp, username, target_message} not found in data file!")

	def delete_all_messages(self):
		"""
		Method that clears the data file

		"""
		assert len(self.data) > 0, "Data file is already empty!"

		for element in self:
			self.data.remove(element)

		self.update_data()
