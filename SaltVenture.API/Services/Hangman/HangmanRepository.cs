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

    public async Task<Hangman> UpdateGame(Hangman game)
    {
           var updateGame = _context.HangmanGames?.Update(game);
        await _context.SaveChangesAsync();
        return updateGame!.Entity;
    }
}