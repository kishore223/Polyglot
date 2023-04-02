package team4.slupolyglot;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.fasterxml.jackson.core.type.TypeReference;

import static org.junit.Assert.assertEquals;

import java.math.BigDecimal;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

import team4.slupolyglot.model.Authenticator;
import team4.slupolyglot.model.Player;
import team4.slupolyglot.repositories.PlayerRepository;

import team4.slupolyglot.controller.request.SignInRequestJson;
import team4.slupolyglot.controller.request.SignUpRequestJson;
import team4.slupolyglot.controller.Controller;

@RunWith(SpringRunner.class)
@WebMvcTest(Controller.class)
public class SluPolyglotApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PlayerRepository playerRepository;

    @Mock
    private Authenticator authenticator;

    private final String SIGN_IN_END_POINT = "/polyglot/player/signIn";
    private final String SIGN_UP_END_POINT = "/polyglot/player/signUp";
    private final String SIGN_IN_SUCCESS_CODE = Controller.SIGN_IN_SUCCESS_CODE;
    private final String SIGN_IN_SUCCESS_DESCRIPTION = Controller.SIGN_IN_SUCCESS_DESCRIPTION;
    private final String SIGN_IN_FAILURE_CODE = Controller.SIGN_IN_FAILURE_CODE;
    private final String SIGN_IN_FAILURE_DESCRIPTION = Controller.SIGN_IN_FAILURE_DESCRIPTION;
    private final String SIGN_UP_SUCCESS_CODE = Controller.SIGN_UP_SUCCESS_CODE;
    private final String SIGN_UP_SUCCESS_DESCRIPTION = Controller.SIGN_UP_SUCCESS_DESCRIPTION;
    private final String SIGN_UP_FAILURE_CODE = Controller.SIGN_UP_FAILURE_CODE;
    private final String SIGN_UP_FAILURE_DESCRIPTION = Controller.SIGN_UP_FAILURE_DESCRIPTION;


    @Test
    public void testSignInPlayerSuccess() throws Exception {
        String email = "test@example.com";
        String password = "password";
        Player player = new Player(email, "Test User", new BigDecimal("100.00"), password);
        SignInRequestJson signInRequestJson = new SignInRequestJson(email, password);

        Mockito.when(playerRepository.findByEmail(email)).thenReturn(player);
        Mockito.when(authenticator.playerDetailsValidator(signInRequestJson, player)).thenReturn(true);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(SIGN_IN_END_POINT)
                .content(asJsonString(signInRequestJson))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        int statusCode = result.getResponse().getStatus();
        String content = result.getResponse().getContentAsString();
        Map<String, String> response = asResponseMap(content);

        assertEquals(200, statusCode);
        assertEquals(SIGN_IN_SUCCESS_CODE, response.get("errorCode"));
        assertEquals(SIGN_IN_SUCCESS_DESCRIPTION, response.get("errorMessage"));
        assertEquals(email, response.get("email"));
        assertEquals(player.getUserName(), response.get("name"));
        assertEquals(player.getScore(), response.get("score"));
    }

    @Test
    public void testSignInPlayerFailureWrongEmail() throws Exception {
        String email = "WrongEmail@example.com";
        String password = "password";
        SignInRequestJson signInRequestJson = new SignInRequestJson(email, password);

        Mockito.when(playerRepository.findByEmail(email)).thenReturn(null);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(SIGN_IN_END_POINT)
                .content(asJsonString(signInRequestJson))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        int statusCode = result.getResponse().getStatus();
        String content = result.getResponse().getContentAsString();
        Map<String, String> response = asResponseMap(content);

        assertEquals(200, statusCode);
        assertEquals(SIGN_IN_FAILURE_CODE, response.get("errorCode"));
        assertEquals(SIGN_IN_FAILURE_DESCRIPTION, response.get("errorMessage"));
    }

    @Test
    public void testSignInPlayerFailureWrongEmailPassword() throws Exception {
        String email = "test@example.com";
        String password = "WrongPassword";
        SignInRequestJson signInRequestJson = new SignInRequestJson(email, password);

        Mockito.when(playerRepository.findByEmail(email)).thenReturn(null);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(SIGN_IN_END_POINT)
                .content(asJsonString(signInRequestJson))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        int statusCode = result.getResponse().getStatus();
        String content = result.getResponse().getContentAsString();
        Map<String, String> response = asResponseMap(content);

        assertEquals(200, statusCode);
        assertEquals(SIGN_IN_FAILURE_CODE, response.get("errorCode"));
        assertEquals(SIGN_IN_FAILURE_DESCRIPTION, response.get("errorMessage"));
    }

    @Test
    public void testSignUpPlayerSuccess() throws Exception {
        String email = "test@example.com";
        String password = "password";
        String name = "Test User";
        BigDecimal score = new BigDecimal("0.00");
        Player player = new Player(email, name, score, password);

        Mockito.when(playerRepository.findByEmail(email)).thenReturn(null);
        Mockito.when(playerRepository.save(Mockito.any(Player.class))).thenReturn(player);

        SignUpRequestJson signUpRequestJson = new SignUpRequestJson(email, password, name);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(SIGN_UP_END_POINT)
                .content(asJsonString(signUpRequestJson))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        int statusCode = result.getResponse().getStatus();
        String content = result.getResponse().getContentAsString();
        Map<String, String> response = asResponseMap(content);

        assertEquals(200, statusCode);
        assertEquals(SIGN_UP_SUCCESS_CODE, response.get("errorCode"));
        assertEquals(SIGN_UP_SUCCESS_DESCRIPTION, response.get("errorMessage"));
        assertEquals(email, response.get("email"));
        assertEquals(name, response.get("name"));
        assertEquals(score, response.get("score"));
    }

    @Test
    public void testSignUpPlayerEmailAlreadyExists() throws Exception {
        String email = "test@example.com";
        String password = "password";
        String name = "Test User";

        Mockito.when(playerRepository.findByEmail(email)).thenReturn(new Player());

        SignUpRequestJson signUpRequestJson = new SignUpRequestJson(email, password, name);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(SIGN_UP_END_POINT)
                .content(asJsonString(signUpRequestJson))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        int statusCode = result.getResponse().getStatus();
        String content = result.getResponse().getContentAsString();
        Map<String, String> response = asResponseMap(content);

        assertEquals(200, statusCode);
        assertEquals(SIGN_UP_FAILURE_CODE, response.get("errorCode"));
        assertEquals(SIGN_UP_FAILURE_DESCRIPTION, response.get("errorMessage"));
    }

    private static String asJsonString(final Object obj) {
        try {
            final ObjectMapper objectMapper = new ObjectMapper();
            final String jsonContent = objectMapper.writeValueAsString(obj);
            return jsonContent;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    private Map<String, String> asResponseMap(String content) {
        try {
            final ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(content, new TypeReference<Map<String, String>>() {});
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }





}
