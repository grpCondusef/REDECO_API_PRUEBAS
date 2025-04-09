import request from "supertest";
import app from "../src/app";
import { jest } from '@jest/globals';
import { getMediosDeRecepcion } from '../src/controllers/catalogos.controllers';

test('Debería devolver una lista de medios de recepción', async () => {
  const mockRequest = {};
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await getMediosDeRecepcion(mockRequest, mockResponse);

  expect(mockResponse.status).toHaveBeenCalledWith(200);
  expect(mockResponse.json).toHaveBeenCalledWith({
    medio: expect.any(Array),
  });
  
});


