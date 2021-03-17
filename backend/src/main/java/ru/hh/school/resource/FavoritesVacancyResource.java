package ru.hh.school.resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.hh.nab.common.properties.FileSettings;
import ru.hh.school.dto.FavoriteVacancyDto;
import ru.hh.school.service.VacancyService;

import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Singleton
@Path("/favorites/vacancy")
public class FavoritesVacancyResource {

    private static final Logger logger = LoggerFactory.getLogger(FavoritesVacancyResource.class);

    private final VacancyService vacancyService;
    private final FileSettings fileSettings;

    public FavoritesVacancyResource(VacancyService vacancyService, FileSettings fileSettings) {
        this.vacancyService = vacancyService;
        this.fileSettings = fileSettings;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getFavoriteVacancies(
            @DefaultValue("0") @QueryParam("page") Integer page,
            @DefaultValue("20") @QueryParam("per_page") Integer perPage) {
        List<FavoriteVacancyDto> favoriteVacancies = vacancyService.getFavorites(page, perPage);
        return Response.ok()
                .header("Access-Control-Allow-Origin", fileSettings.getString("cors.settings"))
                .entity(favoriteVacancies).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addVacancyToFavorites(
            @FormParam("vacancy_id") Integer vacancyId,
            @DefaultValue("") @FormParam("comment") String comment
    ) {
        try {
            vacancyService.addVacancyToFavorites(vacancyId, comment);
            return Response.ok()
                    .header("Access-Control-Allow-Origin", fileSettings.getString("cors.settings"))
                    .build();
        } catch (WebApplicationException exception) {
            throw new WebApplicationException(exception.getMessage(), exception.getResponse().getStatus());
        }
    }

    @DELETE
    @Path("/{vacancy_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteCompany(@PathParam("vacancy_id") Integer vacancyId) {
        vacancyService.deleteVacancy(vacancyId);
        return Response.ok()
                .header("Access-Control-Allow-Origin", fileSettings.getString("cors.settings"))
                .build();
    }

    @POST
    @Path("/{vacancy_id}/refresh")
    @Produces(MediaType.APPLICATION_JSON)
    public Response refresh(@PathParam("vacancy_id") Integer vacancyId) {
        try {
            vacancyService.refresh(vacancyId);
            return Response.ok()
                    .header("Access-Control-Allow-Origin", fileSettings.getString("cors.settings"))
                    .build();
        } catch (WebApplicationException exception) {
            throw new WebApplicationException(exception.getMessage(), exception.getResponse().getStatus());
        }
    }

    @OPTIONS
    @Path("{var:.*}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response allowOptions() {
        logger.info("OPTIONS METHOD");
        return Response.ok()
                    .header("Access-Control-Allow-Origin", fileSettings.getString("cors.settings"))
                    .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                    .header("Access-Control-Allow-Credentials", "true")
                    .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization, access-control-allow-origin")
                    .build();
    }

}
