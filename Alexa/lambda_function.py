"""
treehacks 2021
February 09, 2021

"""
import logging
from ask_sdk_core.skill_builder import SkillBuilder
from ask_sdk_core.utils import is_request_type, is_intent_name
from ask_sdk_core.handler_input import HandlerInput
from ask_sdk_model import Response
from ask_sdk_model.ui import SimpleCard
import requests
import json
import random

sb = SkillBuilder()

logger = logging.getLogger()
logger.setLevel(logging.INFO)


# invocation
@sb.request_handler(can_handle_func=is_request_type("LaunchRequest"))
def launch_request_handler(handler_input):
    """
    Invoked after launching Alexa.

    Say: 'Alexa launch get together'
    """
    speech_text = "Hello! Are you looking to connect and play with others?"
    handler_input.response_builder.speak(speech_text).set_card(
        SimpleCard("Hello! Are you looking to connect and play with others?", speech_text)).set_should_end_session(False)
    return handler_input.response_builder.response

# find_events
@sb.request_handler(can_handle_func=is_intent_name("find_events"))
def find_events(handler_input):
    """
    Search all the events happening near the user.

    Say: 'Alexa tell me about current events.'
    """

    length = 0

    events_list = requests.get("http://3.17.148.9:8080/events")

    # check for response code from server
    if events_list.status_code == 200:
        events_list = events_list.content
        details = json.loads(events_list.decode('utf-8'))
        length = len(details)

    # store count of every event
    events = dict()

    # generate response text
    response_text = ""

    for i in range(length):
        cat = details[i]['event_category']
        if cat not in events:
            events[cat] = 1
        else:
            events[cat] += 1
    
    for event, count  in events.items():
        response_text += str(count) + " " + event+", "

    speech_text = "I found {} events.".format(response_text)
    handler_input.response_builder.speak(speech_text).set_card(
    SimpleCard("I found {} events.".format(response_text), speech_text)).set_should_end_session(False)
    return handler_input.response_builder.response

# event_detail
@sb.request_handler(can_handle_func=is_intent_name("event_detail"))
def find_events(handler_input):
    
    """
    Select a specific event from the list mentioned in previous flow.

    Say: 'Alexa tell me more about sports'
    """
    
    slots = handler_input.request_envelope.request.intent.slots
    
    selected_event = slots['event_cat'].resolutions.resolutions_per_authority[0].values[0].value.name
    
    events_list = requests.get("http://3.17.148.9:8080/events")
    length = 0

    if events_list.status_code == 200:
        events_list = events_list.content
        details = json.loads(events_list.decode('utf-8'))
        length = len(details)

    events = dict()
    response_text = ""
    for i in range(length):
        if details[i]["event_category"].lower() == selected_event:
            cat = details[i]['event']
            if cat not in events:
                events[cat] = 1
            else:
                events[cat] += 1
        
    for event, count  in events.items():
        response_text += str(count) +  + event+", "

    speech_text = "I found {}".format(response_text)
    handler_input.response_builder.speak(speech_text).set_card(
    SimpleCard("I found {}".format(response_text), speech_text)).set_should_end_session(False)
    return handler_input.response_builder.response


# select_event
@sb.request_handler(can_handle_func=is_intent_name("select_event"))
def find_events(handler_input):
    """
    Finalize the event

    Say: 'Alexa book footbal'
    """
    slots = handler_input.request_envelope.request.intent.slots

    selected_sport = slots['sports'].resolutions.resolutions_per_authority[0].values[0].value.name

    speech_text = "Thank you. I am requesting hosts who are associated with {}".format(selected_sport)
    handler_input.response_builder.speak(speech_text).set_card(
    SimpleCard("I found 10 events near me.", speech_text)).set_should_end_session(False)
    return handler_input.response_builder.response

# help_event
@sb.request_handler(can_handle_func=is_intent_name("AMAZON.HelpIntent"))
def help_intent_handler(handler_input):

	# when user doesn't know the function of bot 

    speech_text = "You can say, tell me events happening near me or tell me about sports"
    handler_input.response_builder.speak(speech_text).set_card(SimpleCard("You can say", speech_text)).set_should_end_session(False)
    return handler_input.response_builder.response

# stop_intent
@sb.request_handler(can_handle_func=is_intent_name("AMAZON.StopIntent"))
def stop_intent_handler(handler_input):

	# ends current session

	response = {1 : "See you, bye",  2 : "Bye-bye", 3: "Take care", 4 : "It was my pleasure"}
	output = str(list(response.values())[random.randint(1,4)])
	speech_text = "{}".format(output) 
	handler_input.response_builder.speak(speech_text).set_card(SimpleCard("Good Bye!", speech_text)).set_should_end_session(True)
	return handler_input.response_builder.response


lambda_handler = sb.lambda_handler()