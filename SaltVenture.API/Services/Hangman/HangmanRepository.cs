using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaltVenture.API.Data;
using SaltVenture.API.Models;
using SaltVenture.API.Models.Games;
using System.Text.Json;
using System.Text.Json.Serialization;
using SaltVenture.API.Models.Request;
using System;
using Newtonsoft.Json;

namespace SaltVenture.API.Services;

public class HangmanRepository : IHangmanRepository
{
    private readonly SaltVentureDbContext _context;

    public HangmanRepository(SaltVentureDbContext context)
    {
        _context = context;
    }


    public async Task<Hangman> CreateGame(Hangman game)
    {
         _context.HangmanGames!.Add(game);
        await _context.SaveChangesAsync();
        return game;
    }
    public async Task<Hangman> GetActiveGame(int claimedId)
    {
        return await _context.HangmanGames
            .Include(c => c.Bet.User)
            .OrderBy(c => c.Id).LastOrDefaultAsync(g => g.User.Id == claimedId && !g.IsCompleted);
    }

    public async Task<Hangman> GetGame(int gameId)
    {
        return await _context.HangmanGames.FirstOrDefaultAsync(g => g.Id == gameId);
    }

    public async Task<HangmanWordRequest> GetWord(HangmanWordRequest word)
    {
            //Define your baseUrl
            string baseUrl = "https://random-words-api.vercel.app/word";
            //Have your using statements within a try/catch block
            try
            {
                //We will now define your HttpClient with your first using statement which will use a IDisposable.
                using (HttpClient client = new HttpClient())
                {
                    //In the next using statement you will initiate the Get Request, use the await keyword so it will execute the using statement in order.
                    //The HttpResponseMessage which contains status code, and data from response.
                    using (var res = await client.GetAsync(baseUrl))
                    {
                        Console.WriteLine(res);
                        return JsonConvert.DeserializeObject<HangmanWordRequest>(res.Content.ToString()!);
                        //Then get the data or content from the response in the next using statement, then within it you will get the data, and convert it to a c# object.
                    }
                }
            } catch(Exception exception)
            {
                Console.WriteLine("Exception Hit------------");
                Console.WriteLine(exception);
            throw new ArgumentException("Failed to fetch");

            }
            throw new ArgumentException("Failed to fetch");
    }

    public async Task<Hangman> UpdateGame(Hangman game)
    {
           var updateGame = _context.HangmanGames?.Update(game);
        await _context.SaveChangesAsync();
        return updateGame!.Entity;
    }
}