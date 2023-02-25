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

import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

import team4.slupolyglot.model.Authenticator;
import team4.slupolyglot.model.Player;
import team4.slupolyglot.model.PlayerRepository;

import team4.slupolyglot.model.SignInRequestJson;
import team4.slupolyglot.model.SignUpRequestJson;
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

    private final String signInEndPoint = "/polyglot/player/signIn";
    private final String signUpEndPoint = "/polyglot/player/signUp";
    private final String signInSuccessCode = Controller.signInSuccessCode;
    private final String signInSuccessDescription = Controller.signInSuccessDescription;
    private final String signInFailureCode = Controller.signInFailureCode;
    private final String signInFailureDescription = Controller.signInFailureDescription;
    private final String signUpSuccessCode = Controller.signUpSuccessCode;
    private final String signUpSuccessDescription = Controller.signUpSuccessDescription;
    private final String signUpFailureCode = Controller.signUpFailureCode;
    private final String signUpFailureDescription = Controller.signUpFailureDescription;
   

    @Test
    public void testSignInPlayerSuccess() throws Exception {
        String email = "test@example.com";
        String password = "password";
        Player player = new Player(email, "Test User", "100", password);
        SignInRequestJson signInRequestJson = new SignInRequestJson(email, password);

        Mockito.when(playerRepository.findByEmail(email)).thenReturn(player);
        Mockito.when(authenticator.playerDetailsValidator(signInRequestJson, player)).thenReturn(true);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(signInEndPoint)
                .content(asJsonString(signInRequestJson))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        int statusCode = result.getResponse().getStatus();
        String content = result.getResponse().getContentAsString();
        Map<String, String> response = asResponseMap(content);

        assertEquals(200, statusCode);
        assertEquals(signInSuccessCode, response.get("errorCode"));
        assertEquals(signInSuccessDescription, response.get("errorMessage"));
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

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(signInEndPoint)
                .content(asJsonString(signInRequestJson))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        int statusCode = result.getResponse().getStatus();
        String content = result.getResponse().getContentAsString();
        Map<String, String> response = asResponseMap(content);

        assertEquals(200, statusCode);
        assertEquals(signInFailureCode, response.get("errorCode"));
        assertEquals(signInFailureDescription, response.get("errorMessage"));
    }
    @Test
    public void testSignInPlayerFailureWrongEmailPassword() throws Exception {
        String email = "test@example.com";
        String password = "WrongPassword";
        SignInRequestJson signInRequestJson = new SignInRequestJson(email, password);

        Mockito.when(playerRepository.findByEmail(email)).thenReturn(null);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(signInEndPoint)
                .content(asJsonString(signInRequestJson))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        int statusCode = result.getResponse().getStatus();
        String content = result.getResponse().getContentAsString();
        Map<String, String> response = asResponseMap(content);

        assertEquals(200, statusCode);
        assertEquals(signInFailureCode, response.get("errorCode"));
        assertEquals(signInFailureDescription, response.get("errorMessage"));
    }




    @Test
    public void testSignUpPlayerSuccess() throws Exception {
        String email = "test@example.com";
        String password = "password";
        String name = "Test User";
        String score = "0";
        Player player = new Player(email, name, score, password);

        Mockito.when(playerRepository.findByEmail(email)).thenReturn(null);
        Mockito.when(playerRepository.save(Mockito.any(Player.class))).thenReturn(player);

        SignUpRequestJson signUpRequestJson = new SignUpRequestJson(email, password, name);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(signUpEndPoint)
                .content(asJsonString(signUpRequestJson))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        int statusCode = result.getResponse().getStatus();
        String content = result.getResponse().getContentAsString();
        Map<String, String> response = asResponseMap(content);

        assertEquals(200, statusCode);
        assertEquals(signUpSuccessCode, response.get("errorCode"));
        assertEquals(signUpSuccessDescription, response.get("errorMessage"));
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

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(signUpEndPoint)
                .content(asJsonString(signUpRequestJson))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andReturn();

        int statusCode = result.getResponse().getStatus();
        String content = result.getResponse().getContentAsString();
        Map<String, String> response = asResponseMap(content);

        assertEquals(200, statusCode);
        assertEquals(signUpFailureCode, response.get("errorCode"));
        assertEquals(signUpFailureDescription, response.get("errorMessage"));
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