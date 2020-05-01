FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["FMF_Backend.csproj", "./"]
RUN dotnet restore "./FMF_Backend.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "FMF_Backend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FMF_Backend.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FMF_Backend.dll"]