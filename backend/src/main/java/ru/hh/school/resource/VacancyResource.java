package ru.hh.school.resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.hh.nab.common.properties.FileSettings;
import ru.hh.school.dto.VacancyDto;
import ru.hh.school.service.ApiService;
import ru.hh.school.component.VacancyMapper;

import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Singleton
@Path("/vacancy")
public class VacancyResource {

    private static final Logger logger = LoggerFactory.getLogger(VacancyResource.class);

    private final ApiService apiService;
    private final VacancyMapper vacancyMapper;
    private final FileSettings fileSettings;

    public VacancyResource(ApiService apiService, VacancyMapper vacancyMapper, FileSettings fileSettings) {
        this.apiService = apiService;
        this.vacancyMapper = vacancyMapper;
        this.fileSettings = fileSettings;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getVacanciesFromApi (
            @DefaultValue("") @QueryParam("query") String query,
            @DefaultValue("0") @QueryParam("page") Integer page,
            @DefaultValue("20") @QueryParam("per_page") Integer perPage
    ) {
        try {
            String dataFromApi = apiService.fetchVacanciesFromApi(query, page, perPage);
            List<VacancyDto> vacancies = vacancyMapper.mapListOfItemsFromApi(dataFromApi);
            return Response.ok()
                    .header("Access-Control-Allow-Origin", fileSettings.getString("cors.settings"))
                    .entity(vacancies).build();
        } catch (WebApplicationException exception) {
            throw new WebApplicationException(exception.getMessage(), exception.getResponse().getStatus());
        }
    }

    @GET
    @Path("/{vacancy_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getVacancyFromApiById(@PathParam("vacancy_id") Integer vacancyId) {
        try {
            String dataFromApi = apiService.fetchVacanciesFromApiById(vacancyId);
            VacancyDto vacancy = vacancyMapper.mapSingleItemFromApiToDto(dataFromApi);
            return Response.ok()
                    .header("Access-Control-Allow-Origin", fileSettings.getString("cors.settings"))
                    .entity(vacancy).build();
        } catch (WebApplicationException exception) {
            throw new WebApplicationException(exception.getMessage(), exception.getResponse().getStatus());
        }
    }

}
