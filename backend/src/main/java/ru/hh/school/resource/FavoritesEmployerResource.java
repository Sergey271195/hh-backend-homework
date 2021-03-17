package ru.hh.school.resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ru.hh.nab.common.properties.FileSettings;
import ru.hh.school.dto.FavoriteEmployerDto;
import ru.hh.school.service.EmployerService;

import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Singleton
@Path("/favorites/employer")
public class FavoritesEmployerResource {

    private static final Logger logger = LoggerFactory.getLogger(FavoritesEmployerResource.class);

    private final EmployerService employerService;
    private final FileSettings fileSettings;

    public FavoritesEmployerResource(EmployerService employerService, FileSettings fileSettings) {
        this.employerService = employerService;
        this.fileSettings = fileSettings;
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getFavoriteEmployers(
            @DefaultValue("0") @QueryParam("page") Integer page,
            @DefaultValue("20") @QueryParam("per_page") Integer perPage) {
        logger.info("HERE");
        List<FavoriteEmployerDto> favoriteEmployers = employerService.getFavorites(page, perPage);
        return Response.ok()
                .header("Access-Control-Allow-Origin", fileSettings.getString("cors.settings"))
                .entity(favoriteEmployers).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addEmployerToFavorites(
            @FormParam("employer_id") Integer employerId,
            @DefaultValue("") @FormParam("comment") String comment) {
        try {
            employerService.addEmployerToFavorites(employerId, comment);
            return Response.ok()
                    .header("Access-Control-Allow-Origin", fileSettings.getString("cors.settings"))
                    .build();
        } catch (WebApplicationException exception) {
            throw new WebApplicationException(exception.getMessage(), exception.getResponse().getStatus());
        }
    }

    @PUT
    @Path("/{employer_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateComment(
            @PathParam("employer_id") Integer employerId,
            @DefaultValue("") @FormParam("comment") String comment) {
        employerService.updateComment(employerId, comment);
        return Response.ok()
                .header("Access-Control-Allow-Origin", fileSettings.getString("cors.settings"))
                .build();
    }

    @DELETE
    @Path("/{employer_id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteCompany(@PathParam("employer_id") Integer employerId) {
        employerService.deleteCompany(employerId);
        return Response.ok()
                .header("Access-Control-Allow-Origin", fileSettings.getString("cors.settings"))
                .build();
    }

    @POST
    @Path("/{employer_id}/refresh")
    @Produces(MediaType.APPLICATION_JSON)
    public Response refresh(@PathParam("employer_id") Integer employerId) {
        try {
            employerService.refresh(employerId);
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
