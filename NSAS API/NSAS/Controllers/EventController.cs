using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSAS.Context;
using NSAS.Services;

namespace NSAS.Controllers
{
    [Route("api/[controller]")]
    public class EventController : ApiController
    {
        private EventService _eventService;

        public EventController(ApplicationContext context)
        {
            this._eventService = new EventService(context);
        }

        [HttpPost("CreateEvent")]
        public HttpResponseMessage CreateEvent([FromBody] Event newEvent)
        {
            var response = new HttpResponseMessage(HttpStatusCode.InternalServerError);

            if (!_eventService.ExistsInDb(newEvent.Id) && !_eventService.ExistsInDb(newEvent))
            {
                if (_eventService.AddEvent(newEvent))
                {
                    response.StatusCode = HttpStatusCode.OK;
                }
                else
                {
                    response.Content = new StringContent("Could not create the event. Please try again.");
                }
            }
            else
            {
                response.Content = new StringContent("Event already exists.");
            }

            return response;
        }
        [HttpGet("getEvent")]
        public ActionResult<List<Event>> GetEvent()
      {
            var events = _eventService.GetAllEvent();
            return events;
        }

    }
}