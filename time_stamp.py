# time.py, a file that handles datetime and time stamping
import datetime

def getCurrentTime():
	"""
	Method that handles getting the current time

	@returns: current time in 'hour : minute' format

	"""
	current_hour = datetime.datetime.now().hour
	current_minute = datetime.datetime.now().minute

	if current_minute < 10:
		current_minute = (f"0{current_minute}")


	return f"{current_hour}:{current_minute} AM" if current_hour <= 12 else f"{current_hour % 12}:{current_minute} PM"

def getCurrentDate():
	"""
	Method that handles getting the current date

	@returns: current date in 'Month/Day/Year' format

	"""
	current_month = datetime.datetime.now().month
	current_day = datetime.datetime.now().day
	current_year = datetime.datetime.now().year

	return f"{current_month}/{current_day}/{current_year}"

def getCurrentTimeStamp():
	"""
	Method that handles getting the current time stamp (date and time)

	@returns: current date in 'Month/Day/Year - Hour/Minute' format

	"""
	return f"{getCurrentDate()} - {getCurrentTime()}"
