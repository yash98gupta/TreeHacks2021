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

sb = SkillBuilder()

logger = logging.getLogger()
logger.setLevel(logging.INFO)


# invocation
@sb.request_handler(can_handle_func=is_request_type("LaunchRequest"))
def launch_request_handler(handler_input):
    """
    Invoked after launching Alexa.

    Say: Alexa launch get together
    """
    speech_text = "Hello Tushar! Are you looking to connect and play with others?"
    handler_input.response_builder.speak(speech_text).set_card(
        SimpleCard("Hello Tushar! Are you looking to connect and play with others?", speech_text)).set_should_end_session(False)
    return handler_input.response_builder.response

# find_events
@sb.request_handler(can_handle_func=is_intent_name("find_events"))
def find_events(handler_input):
    
    events_list = requests.get("http://3.17.148.9:8080/events")
    length = 0

    if events_list.status_code == 200:
        events_list = events_list.content
        details = json.loads(events_list.decode('utf-8'))
        length = len(details)

    events = dict()
    text = ""
    for i in range(length):
        cat = details[i]['event_category']
        if cat not in events:
            events[cat] = 1
        else:
            events[cat] += 1
    
    for event, count  in events.items():
        text += str(count) + " " + event+", "
    print(text)
    speech_text = "I found {} events.".format(text)
    handler_input.response_builder.speak(speech_text).set_card(
    SimpleCard("I found 10 events near me.", speech_text)).set_should_end_session(False)
    return handler_input.response_builder.response

# event_detail
@sb.request_handler(can_handle_func=is_intent_name("event_detail"))
def find_events(handler_input):
    
    slots = handler_input.request_envelope.request.intent.slots

    # print("****")
    # print(slots['event_cat'].resolutions.resolutions_per_authority[0].values[0])
    # print(slots['event_cat'].resolutions.resolutions_per_authority[0].values[0].value.name)
    # print("****")
    selected_event = slots['event_cat'].resolutions.resolutions_per_authority[0].values[0].value.name
    events_list = requests.get("http://3.17.148.9:8080/events")
    length = 0

    if events_list.status_code == 200:
        events_list = events_list.content
        details = json.loads(events_list.decode('utf-8'))
        length = len(details)
    print("selected: ", selected_event)
    events = dict()
    text = ""
    for i in range(length):
        if details[i]["event_category"].lower() == selected_event:
            cat = details[i]['event']
            if cat not in events:
                events[cat] = 1
            else:
                events[cat] += 1
    print(dict)
    
    activity = {"playing": ["sports", "esports"], "hiking": ['']}
    for event, count  in events.items():
        text += str(count) +  + event+", "

    speech_text = "I found {}".format(text)
    handler_input.response_builder.speak(speech_text).set_card(
    SimpleCard("I found {}".format(text), speech_text)).set_should_end_session(False)
    return handler_input.response_builder.response


# select_event
@sb.request_handler(can_handle_func=is_intent_name("select_event"))
def find_events(handler_input):
    
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

lambda_handler = sb.lambda_handler()