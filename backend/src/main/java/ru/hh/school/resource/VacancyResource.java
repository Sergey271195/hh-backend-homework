package ru.hh.school.resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.hh.school.dto.VacancyDto;
import ru.hh.school.service.ApiService;

import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Singleton
@Path("/vacancy")
public class VacancyResource {

    private static final Logger logger = LoggerFactory.getLogger(ExampleResource.class);

    private final ApiService apiService;

    public VacancyResource(ApiService apiService) {
        this.apiService = apiService;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getVacanciesFromApi (
            @QueryParam("query") String query,
            @DefaultValue("0") @QueryParam("page") Integer page,
            @DefaultValue("20") @QueryParam("per_page") Integer perPage
    ) {
        try {
            List<VacancyDto> vacancies = apiService.fetchVacanciesFromApi(query, page, perPage);
            return Response.ok().entity(vacancies).build();
        } catch (WebApplicationException exception) {
            throw new WebApplicationException(exception.getMessage(), exception.getResponse().getStatus());
        }
    }

}